import { Heart } from 'lucide-react';

export function Footer() {
    return (
        <footer className="w-full py-12 px-4 text-center text-[#7A6B63] text-sm flex flex-col items-center gap-6 mt-auto">
            <div className="w-full h-px bg-[#2B1E1A]/5 max-w-[200px] mx-auto mb-2"></div>

            <div className="flex items-center gap-1.5 justify-center font-medium opacity-80">
                <span>Made with</span>
                <Heart className="w-3.5 h-3.5 text-[#D56A6A] fill-[#D56A6A]" />
                <span>for love</span>
            </div>

            <a
                href="https://www.buymeacoffee.com/DevopsAI"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-105 hover:drop-shadow-lg"
                title="Support the creator"
            >
                <img
                    src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee(Tip)&emoji=☕&slug=DevopsAI&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
                    alt="Buy me a coffee"
                    className="h-12"
                />
            </a>

            <div className="text-xs opacity-50">
                © {new Date().getFullYear()} LoveLink • Free & Open Source
            </div>
        </footer>
    );
}
