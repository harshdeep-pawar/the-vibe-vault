export default function AnnouncementBar() {
  return (
    <div className="w-full bg-gradient-to-r from-gold via-[#e8d5a3] to-gold text-luxury-black py-2 px-4 text-center font-button font-semibold text-[11px] uppercase tracking-[2px] z-[1001] relative overflow-hidden select-none">
      <div className="animate-[shimmer_3s_linear_infinite] bg-[length:200%_auto] text-center w-full flex items-center justify-center gap-2">
        <span>⚡ Drop Alert: New Streetwear Essentials Live ⚡</span>
        <span className="hidden sm:inline">| Free Pan-India Shipping on orders above ₹1,500</span>
      </div>
    </div>
  );
}
