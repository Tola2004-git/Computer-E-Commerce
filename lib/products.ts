export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  tags: string[];
  img: string;
};

export const products: Product[] = [
  {
    id: "desktop-1",
    name: "Computer Shop Apex X9",
    category: "Desktop",
    price: 3299,
    tags: ["RTX 5090", "Ryzen 9"],
    img: "desktop-1.png",
  },
  {
    id: "desktop-2",
    name: "Computer Shop Tower II",
    category: "Desktop",
    price: 2499,
    tags: ["RTX 4080", "Intel i9"],
    img: "desktop-2.png",
  },
  {
    id: "desktop-3",
    name: "Computer Shop Studio Workstation",
    category: "Desktop",
    price: 1999,
    tags: ["Xeon", "ECC RAM"],
    img: "desktop-3.png",
  },
  {
    id: "desktop-4",
    name: "Computer Shop Compact Gaming PC",
    category: "Desktop",
    price: 1799,
    tags: ["RTX 4070", "Mini-ITX"],
    img: "desktop-4.png",
  },
  {
    id: "desktop-5",
    name: "Computer Shop Budget Builder",
    category: "Desktop",
    price: 999,
    tags: ["GTX 1660", "Value"],
    img: "desktop-5.png",
  },

  {
    id: "laptop-1",
    name: "Blade Pro 16",
    category: "Laptop",
    price: 2499,
    tags: ["RTX 5080", "240Hz"],
    img: "laptop-1.png",
  },
  {
    id: "laptop-2",
    name: "Blade Stealth 14",
    category: "Laptop",
    price: 1999,
    tags: ["RTX 4070", "OLED"],
    img: "laptop-2.png",
  },
  {
    id: "laptop-3",
    name: "CreatorBook 16",
    category: "Laptop",
    price: 2199,
    tags: ["Studio GPU", "Calibrated"],
    img: "laptop-3.png",
  },
  {
    id: "laptop-4",
    name: "WorkMate 15",
    category: "Laptop",
    price: 1299,
    tags: ["Integrated GPU", "Lightweight"],
    img: "laptop-4.png",
  },

  {
    id: "keyboard-1",
    name: "Vortex TKL",
    category: "Keyboard",
    price: 189,
    tags: ["Hot-swap", "Wireless"],
    img: "keyboard-1.png",
  },
  {
    id: "keyboard-2",
    name: "Vortex Pro",
    category: "Keyboard",
    price: 249,
    tags: ["75%", "RGB"],
    img: "keyboard-2.png",
  },
  {
    id: "keyboard-3",
    name: "Retro Click",
    category: "Keyboard",
    price: 139,
    tags: ["Tactile", "Vintage"],
    img: "keyboard-3.png",
  },
  {
    id: "keyboard-4",
    name: "SilentBoard",
    category: "Keyboard",
    price: 169,
    tags: ["Silent", "Low-profile"],
    img: "keyboard-4.png",
  },
  {
    id: "keyboard-5",
    name: "Macro Master",
    category: "Keyboard",
    price: 209,
    tags: ["Macro Keys", "Wireless"],
    img: "keyboard-5.png",
  },

  {
    id: "mouse-1",
    name: "Flux Pro Wireless",
    category: "Mouse",
    price: 149,
    tags: ["26K DPI", "Wireless"],
    img: "mouse-1.png",
  },
  {
    id: "mouse-2",
    name: "Flux S",
    category: "Mouse",
    price: 99,
    tags: ["Lightweight", "Wired"],
    img: "mouse-2.png",
  },
  {
    id: "mouse-3",
    name: "Flux RGB",
    category: "Mouse",
    price: 129,
    tags: ["RGB", "Ergonomic"],
    img: "mouse-3.png",
  },
  {
    id: "mouse-5",
    name: "Flux Pro X",
    category: "Mouse",
    price: 179,
    tags: ["High-precision", "Wireless"],
    img: "mouse-5.png",
  },
];
