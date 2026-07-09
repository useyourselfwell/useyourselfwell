export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex flex-col items-center gap-2 px-6 py-8 text-center">
        <p className="font-playfair text-base font-medium text-foreground">
          Use Yourself Well
        </p>
        <p className="text-xs text-muted/60">
          &copy; {new Date().getFullYear()} Use Yourself Well. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
