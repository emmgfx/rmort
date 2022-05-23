const Input = ({ label, subtitle, ...props }) => (
  <div>
    <label className="block mb-2 text-sm font-bold uppercase">{label}</label>
    <input
      {...props}
      className="text-indigo-100 font-bold rounded w-full bg-indigo-900 border-indigo-900 border-2 focus:ring-0 focus:border-indigo-500"
    />
    <div className="h-2" />
    <div className="text-sm text-slate-300 text-right">{subtitle}</div>
  </div>
);

export default Input;
