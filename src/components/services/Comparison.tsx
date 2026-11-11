import type { Service } from "@/data/services";

/** Porównanie wariantów: tabela od 768 px, karty (bloki z linią) na mobile. */
export function Comparison({ data }: { data: NonNullable<Service["comparison"]> }) {
  return (
    <>
      <div className="hidden md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="label w-[16%] py-4 pr-6 font-normal text-mute">
                Kryterium
              </th>
              {data.columns.map((col) => (
                <th key={col} scope="col" className="h3 py-4 pr-6 font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.label} className="border-b border-line align-top">
                <th scope="row" className="label py-6 pr-6 font-normal text-mute">
                  {row.label}
                </th>
                {row.values.map((value, i) => (
                  <td key={i} className="py-6 pr-6 text-[1rem]">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden">
        {data.columns.map((col, c) => (
          <section key={col} className="border-t border-line py-6">
            <h3 className="h3">{col}</h3>
            <dl className="mt-4">
              {data.rows.map((row) => (
                <div key={row.label} className="border-t border-line py-3">
                  <dt className="label text-mute">{row.label}</dt>
                  <dd className="mt-1 text-[1rem]">{row.values[c]}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </>
  );
}
