import { FadeIn } from "../animations/FadeIn";

export const LandingSections = () => {
    let contents = [
        {
            headings: "🌍 Explore the Richness of African Culture",
            content: "At AfriMart, we celebrate the vibrant tapestry of African heritage. Our platform is a haven for talented Africans to showcase their cultural prowess, from breathtaking NFTs to captivating artifacts, paintings, and sculptures. Immerse yourself in the beauty, history, and diversity of Africa, all at your fingertips."
        },
        {
            headings: "🏺 Artifacts that Echo History",
            content: "Our curated collection of artifacts echoes the rich history of Africa.From ancient symbolism to contemporary craftsmanship, each piece tells a story that transcends time.Bring a piece of Africa's past into your present, adding a touch of cultural legacy to your space."
        },
        {
            headings: "🌐 Global Delivery for Your Convenience",
            content: "We understand the importance of a seamless shopping experience.That's why we've partnered with a global delivery company to ensure that your purchases reach you securely and in pristine condition.Wherever you are in the world, AfriMart brings Africa to your doorstep."
        },
        {
            headings: "🛒 Shop with Confidence",
            content: "AfriMart is committed to providing a secure and trustworthy shopping environment.Explore our collection with confidence, knowing that each item has been carefully selected to represent the best of African culture."
        },
    ];
    return (
        <>
            {contents.map((e, i) => {
                return (
                    <FormI key={i} content={e.content} headings={e.headings} />
                );
            })}
        </>
    );

};

export const FormI = (content: {
    headings: string,
    content: string;
}) => {
    return (
        <div className="bg-charcoal h-max w-full bg-cover text-center p-16 space-y-8">
            <FadeIn>
                <h1 className="mx-auto text-[var(--sand)] font-serif text-4xl">
                    {content.headings}
                </h1>
            </FadeIn>
            <FadeIn>
                <p className="text-white max-w-2xl mx-auto">
                    {content.content}
                </p>
            </FadeIn>
        </div>
    );
};