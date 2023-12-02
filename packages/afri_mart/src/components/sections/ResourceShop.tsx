import { FadeIn } from "../animations/FadeIn";

export const ResourceShop = () => {
    return(
        <div className="bg-charcoal w-full bg-cover text-center p-16 space-y-8">
            <FadeIn>

            <h1 className="mx-auto text-[var(--sand)] font-serif text-4xl">
                🏺 Artifacts that Echo History
            </h1>
            </FadeIn>
            <FadeIn>

            <p className="text-white max-w-2xl mx-auto">
                Our curated collection of artifacts echoes the rich history of Africa. From ancient symbolism to contemporary craftsmanship, each piece tells a story that transcends time. Bring a piece of Africa&apos;s past into your present, adding a touch of cultural legacy to your space.
            </p>
            </FadeIn>
        </div>
    )
}