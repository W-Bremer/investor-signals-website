import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="border-b border-navy/10">
      <div className="container-edge pb-28 pt-40 md:pt-48">
        <p className="eyebrow">404</p>
        <h1 className="mt-7 max-w-3xl font-serif text-display-xl font-semibold text-navy">
          There is no page here.
        </h1>
        <p className="mt-7 max-w-md font-sans text-[1.0625rem] leading-[1.75] text-navy/70">
          The address may have changed, or it never existed. Either way, the
          way back is simple.
        </p>
        <div className="mt-10">
          <Button href="/">Return home</Button>
        </div>
      </div>
    </section>
  );
}
