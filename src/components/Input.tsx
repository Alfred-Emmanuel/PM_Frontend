export const InputField = ({
  label,
  name,
  value,
  onChange,
  type,
  error,
}: any) => (
  <div className="relative text-left">
    <input
      type={type}
      placeholder={label}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border rounded-lg bg-tertiary focus:outline-none focus:ring-secondary focus:bg-tertiary text-white"
    />
    {error && <p className="text-red-500 text-sm ml-2 mt-1">{error}</p>}
    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
      <i className={`fas fa-${type === "password" ? "lock" : "envelope"}`} />
    </span>
  </div>
);
