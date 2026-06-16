/**
 * @typedef FormFieldProps
 * @prop {string} label
 * @prop {string} [type]
 * @prop {string} [defaultValue]
 * @prop {string} [placeholder]
 * @prop {boolean} [required]
 */

/**
 * @param {FormFieldProps}
 */
export default function FormField({
	label,
	type = "text",
	defaultValue,
	placeholder,
	required,
}) {
	return (
		<label className="flex flex-col gap-2 text-sm text-gray-600">
			<span
				className={
					required
						? "after:content-['*'] after:ml-1 after:text-red-500"
						: undefined
				}
			>
				{label}
			</span>
			<input
				type={type}
				defaultValue={defaultValue}
				placeholder={placeholder}
				required={required}
				className="border border-black/10 rounded-xl px-4 py-2.5 outline-none focus:border-blue-600 transition-colors bg-gray-50 focus:bg-white text-gray-900"
			/>
		</label>
	);
}
