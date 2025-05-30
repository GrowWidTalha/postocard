import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="border-t-2 border-gray-300 p-8">
            <div className="flex flex-wrap justify-between gap-6">
                {/* Company Info */}
                <section className="w-[14rem]">
                    <img src="/4.jpg" alt="alt" height={70} width={50} />
                    <h2 className="font-bold text-3xl text-yellow-500 font-serif">PostoCard</h2>
                    <p>
                    Address: 2307 Corry Crest Circle ,Katy, TX-77493 USA</p>
                    <p>Phone Number:(346) 479 0233</p>
                    <p>Email: sales@postocard.com</p>
                    
                </section>

                {/* Navigation */}
                <nav className="w-full md:w-auto block">
                    
                    <ul className="space-y-2 text-gray-600">
                        <Link href={"/"}>
                        <li>Home</li>
                        </Link>
                        <Link href={"/Cards"}>
                        <li>Crads</li>
                        </Link>
                        <Link href={"/blog"}>
                        <li>Blog</li>
                        </Link>
                    </ul>
                </nav>

                {/* Help */}
                <nav className="w-full md:w-auto block">
                    <ul className="space-y-2 text-gray-600">
                        <Link href={"/faq"}>
                            <li>FAQs</li>
                        </Link>
                        <Link href={"/shippingpolicy"}>
                            <li>Shipping Policy</li>
                        </Link>
                        <Link href={"/returnpolicy"}>
                            <li>Refund & Returns</li>
                        </Link>
                        <Link href={"/privacypolicy"}>
                            <li>Privacy Policies</li>
                        </Link>
                    </ul>
                </nav>
            </div>

            {/* Footer Bottom */}
            <div className="mt-5 text-center">
                <hr className="border-gray-300 mb-3" />
                <p className="text-gray-600">2025 PostoCard. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
