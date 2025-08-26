import { facebook, instagram, shieldTick, support, truckFast, twitter } from "../assets/icons";
import { bigShoe1, bigShoe2, bigShoe3, customer1, customer2, shoe4, shoe5, shoe6, shoe7, thumbnailShoe1, thumbnailShoe2, thumbnailShoe3 } from "../assets/images";

export const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about-us", label: "About Us" },
    { href: "#products", label: "Products" },
    { href: "#contact-us", label: "Contact Us" },
];

export const shoes = [
    {
        thumbnail: thumbnailShoe1,
        bigShoe: bigShoe1,
    },
    {
        thumbnail: thumbnailShoe2,
        bigShoe: bigShoe2,
    },
    {
        thumbnail: thumbnailShoe3,
        bigShoe: bigShoe3,
    },
];

export const statistics = [
    { value: '1k+', label: 'Brands' },
    { value: '500+', label: 'Shops' },
    { value: '250k+', label: 'Customers' },
];

export const products = [
    {
        id: "nike-air-jordan-01",
        imgURL: shoe4,
        name: "Nike Air Jordan-01",
        price: "$200.20",
        colors: [
            { id: "red", name: "Red", hex: "#DC2626" },
            { id: "black", name: "Black", hex: "#1F2937" },
            { id: "white", name: "White", hex: "#F9FAFB" },
            { id: "blue", name: "Blue", hex: "#2563EB" }
        ],
        sizes: [
            { value: "7", name: "7", available: true },
            { value: "8", name: "8", available: true },
            { value: "9", name: "9", available: true },
            { value: "10", name: "10", available: false },
            { value: "11", name: "11", available: true },
            { value: "12", name: "12", available: true }
        ]
    },
    {
        id: "nike-air-jordan-10",
        imgURL: shoe5,
        name: "Nike Air Jordan-10",
        price: "$210.20",
        colors: [
            { id: "white", name: "White", hex: "#F9FAFB" },
            { id: "gray", name: "Gray", hex: "#6B7280" },
            { id: "navy", name: "Navy", hex: "#1E3A8A" }
        ],
        sizes: [
            { value: "7", name: "7", available: true },
            { value: "8", name: "8", available: true },
            { value: "9", name: "9", available: true },
            { value: "10", name: "10", available: true },
            { value: "11", name: "11", available: false },
            { value: "12", name: "12", available: true }
        ]
    },
    {
        id: "nike-air-jordan-100",
        imgURL: shoe6,
        name: "Nike Air Jordan-100",
        price: "$220.20",
        colors: [
            { id: "black", name: "Black", hex: "#1F2937" },
            { id: "red", name: "Red", hex: "#DC2626" },
            { id: "orange", name: "Orange", hex: "#EA580C" },
            { id: "green", name: "Green", hex: "#059669" }
        ],
        sizes: [
            { value: "6", name: "6", available: true },
            { value: "7", name: "7", available: true },
            { value: "8", name: "8", available: false },
            { value: "9", name: "9", available: true },
            { value: "10", name: "10", available: true },
            { value: "11", name: "11", available: true }
        ]
    },
    {
        id: "nike-air-jordan-001",
        imgURL: shoe7,
        name: "Nike Air Jordan-001",
        price: "$230.20",
        colors: [
            { id: "purple", name: "Purple", hex: "#7C3AED" },
            { id: "pink", name: "Pink", hex: "#EC4899" },
            { value: "yellow", name: "Yellow", hex: "#F59E0B" }
        ],
        sizes: [
            { value: "7", name: "7", available: true },
            { value: "8", name: "8", available: true },
            { value: "9", name: "9", available: true },
            { value: "10", name: "10", available: true },
            { value: "11", name: "11", available: true },
            { value: "12", name: "12", available: false }
        ]
    },
];

export const services = [
    {
        imgURL: truckFast,
        label: "Free shipping",
        subtext: "Enjoy seamless shopping with our complimentary shipping service."
    },
    {
        imgURL: shieldTick,
        label: "Secure Payment",
        subtext: "Experience worry-free transactions with our secure payment options."
    },
    {
        imgURL: support,
        label: "Love to help you",
        subtext: "Our dedicated team is here to assist you every step of the way."
    },
];

export const reviews = [
    {
        imgURL: customer1,
        customerName: 'Morich Brown',
        rating: 4.5,
        feedback: "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!"
    },
    {
        imgURL: customer2,
        customerName: 'Lota Mongeskar',
        rating: 4.5,
        feedback: "The product not only met but exceeded my expectations. I'll definitely be a returning customer!"
    }
];


export const footerLinks = [
    {
        title: "Products",
        links: [
            { name: "Air Force 1", link: "/" },
            { name: "Air Max 1", link: "/" },
            { name: "Air Jordan 1", link: "/" },
            { name: "Air Force 2", link: "/" },
            { name: "Nike Waffle Racer", link: "/" },
            { name: "Nike Cortez", link: "/" },
        ],
    },
    {
        title: "Help",
        links: [
            { name: "About us", link: "/" },
            { name: "FAQs", link: "/" },
            { name: "How it works", link: "/" },
            { name: "Privacy policy", link: "/" },
            { name: "Payment policy", link: "/" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "customer@nike.com", link: "mailto:customer@nike.com" },
            { name: "+92554862354", link: "tel:+92554862354" },
        ],
    },
];

export const socialMedia = [
    { src: facebook, alt: "facebook logo" },
    { src: twitter, alt: "twitter logo" },
    { src: instagram, alt: "instagram logo" },
];
