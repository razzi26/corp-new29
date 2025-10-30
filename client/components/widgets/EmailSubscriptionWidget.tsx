import { Button } from "@/components/Button";

export default function EmailSubscriptionWidget() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <div className="w-16 h-1 bg-brand-secondary mx-auto mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-[hsl(205_100%_12%)] mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              Subscribe to our email newsletter for the latest biosafety news, updates, and insights delivered straight to your inbox.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget as HTMLFormElement);
              const email = fd.get("email");
              console.log({ email });
              alert("Thanks for subscribing!");
              (e.currentTarget as HTMLFormElement).reset();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="h-14 flex-1 bg-white text-slate-900 border-2 border-slate-300 px-4 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
            />
            <Button
              variant="primary"
              size="lg"
              className="bg-[hsl(var(--primary))] hover:bg-[hsl(205_100%_20%)] shadow hover:shadow-md"
            >
              Subscribe
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-600">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
