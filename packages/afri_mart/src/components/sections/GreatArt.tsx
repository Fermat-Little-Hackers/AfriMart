import { FadeIn } from "../animations/FadeIn";

export const GreatArt = () => {
    return (
        <div className="bg-art-bg h-96 w-full bg-cover text-center p-16 space-y-4">
            <FadeIn>

                <h1 className="mx-auto max-w-2xl text-5xl font-serif text-[var(--sand)] h-min">Join Us in Celebrating Africa&apos;s Heritage</h1>
            </FadeIn>
            <FadeIn>
                <p className="max-w-2xl mx-auto h-min">
                    AfriMart is more than a marketplace; it&apos;s a community of individuals passionate about preserving and sharing the beauty of Africa. Join us in celebrating Africa&apos;s heritage, supporting talented artists, and bringing a piece of Africa into your life.

                    Ready to start your cultural journey? Explore AfriMart and embrace the extraordinary richness of African heritage.
                </p>
            </FadeIn>
        </div>
    );
};