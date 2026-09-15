export default function Footer() {
  return (
    <footer className="bg-indigo-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div><h3 className="font-bold text-lg mb-4">Hollywood Guitar Teachers</h3><p className="text-gray-300">Professional guitar lessons in Los Angeles</p></div>
        <div><h4 className="font-bold mb-4">Contact</h4><a href="tel:+18188736719" className="text-amber-400">(818) 873-6719</a><p className="text-gray-300 mt-2">info@hollywoodguitarteachers.com</p><p className="text-gray-300">Los Angeles, CA</p><p className="mt-2"><a href="/looking-for-work" className="text-amber-400 hover:text-amber-300">Looking for Work</a></p></div>
        <div><h4 className="font-bold mb-4">Follow Us</h4><div className="flex gap-4"><a href="#" className="text-gray-300 hover:text-white">FB</a><a href="#" className="text-gray-300 hover:text-white">IG</a><a href="#" className="text-gray-300 hover:text-white">YT</a></div></div>
      </div>
    </footer>
  );
}
