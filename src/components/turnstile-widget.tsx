"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

/**
 * Turnstile widget, rendered explicitly so the single-use token can be reset
 * after a submission attempt while the page stays mounted.
 *
 * Usage:
 *   const widget = useRef<TurnstileWidgetHandle>(null);
 *   const [token, setToken] = useState<string>();
 *   <TurnstileWidget ref={widget} action="contact" onToken={setToken} />
 *   // after the request settles:
 *   widget.current?.reset();
 */

const API_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

/** Read the global without augmenting Window, to stay decoupled from any
 *  ambient Turnstile typings another dependency may declare. */
function turnstileApi(): TurnstileApi | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { turnstile?: TurnstileApi }).turnstile;
}

let apiPromise: Promise<void> | null = null;

function loadTurnstileApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (turnstileApi()) return Promise.resolve();
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<void>((resolve, reject) => {
    const waitForApi = () => {
      if (turnstileApi()) resolve();
      else requestAnimationFrame(waitForApi);
    };

    let script = document.querySelector<HTMLScriptElement>(
      "script[data-turnstile-api]",
    );
    if (!script) {
      script = document.createElement("script");
      script.src = API_SRC;
      script.async = true;
      script.defer = true;
      script.dataset.turnstileApi = "true";
      document.head.appendChild(script);
    }

    script.addEventListener("load", waitForApi);
    script.addEventListener("error", () =>
      reject(new Error("Turnstile script failed to load")),
    );

    if (turnstileApi()) resolve();
  });

  return apiPromise;
}

export type TurnstileWidgetHandle = { reset: () => void };

interface TurnstileWidgetProps {
  /** Stable action for this surface; matched server-side. */
  action: string;
  onToken: (token: string | undefined) => void;
  className?: string;
}

export const TurnstileWidget = forwardRef<
  TurnstileWidgetHandle,
  TurnstileWidgetProps
>(function TurnstileWidget({ action, onToken, className }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);

  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useImperativeHandle(
    ref,
    () => ({
      reset() {
        // Tokens are single-use: clear the held token and re-challenge.
        onTokenRef.current(undefined);
        const widgetId = widgetIdRef.current;
        const api = turnstileApi();
        if (widgetId && api) {
          try {
            api.reset(widgetId);
          } catch {
            // Widget already torn down.
          }
        }
      },
    }),
    [],
  );

  useEffect(() => {
    let cancelled = false;
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    if (!siteKey) {
      console.error("Turnstile: NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set");
      onTokenRef.current(undefined);
      return;
    }

    loadTurnstileApi()
      .then(() => {
        if (cancelled || widgetIdRef.current || !containerRef.current) return;
        const api = turnstileApi();
        if (!api) return;

        widgetIdRef.current = api.render(containerRef.current, {
          sitekey: siteKey,
          action,
          theme: "light",
          callback: (token: string) => onTokenRef.current(token),
          "error-callback": () => onTokenRef.current(undefined),
          "expired-callback": () => onTokenRef.current(undefined),
          "timeout-callback": () => onTokenRef.current(undefined),
        });
      })
      .catch((error) => {
        console.error("Turnstile: widget failed to render", error);
        onTokenRef.current(undefined);
      });

    return () => {
      cancelled = true;
      const widgetId = widgetIdRef.current;
      const api = turnstileApi();
      if (widgetId && api) {
        try {
          api.remove(widgetId);
        } catch {
          // Already removed.
        }
      }
      widgetIdRef.current = null;
    };
  }, [action]);

  return <div ref={containerRef} className={className} />;
});