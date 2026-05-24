export default function Table({ headers, children, className = '' }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left font-medium text-slate-600 dark:text-slate-400"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}
