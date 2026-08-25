import { 
  createSortedRowModel,
  rowSortingFeature,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'



// 3. New in v9: declare which features this table uses (none yet)
const features = tableFeatures({
  rowSortingFeature, // enables sorting APIs and state
  sortedRowModel: createSortedRowModel(), // client-side sorting
})

// 4. Define your columns
// Accessory key must match keys on fetched array
const columns = [
  {
    accessorKey: 'date', // accessorKey shorthand
    header: 'Date',
    cell: (info) => info.getValue(),
  },
  
  {
    accessorKey: 'keyword',
    header: 'Keywords',
    cell: (info) => info.getValue(),
  },

  {
    accessorKey: 'position',
    header: () => 'Position',
  },

  {
    accessorKey: 'location',
    header: 'Location',
    cell: (info) => info.getValue(),
  },

  /*{
    accessorFn: (row) => row.lastName, // accessorFn alternative with a custom id
    id: 'lastName',
    header: () => <span>Last Name</span>,
    cell: (info) => <i>{info.getValue()}</i>,
  },
  */
]

export function Table({ data }) {
  // 5. Create the table instance
  const table = useTable({
    key: 'table', // needed for devtools, omit if you don't want to use the devtools
    features,
    columns,
    data: data,
  })

  // 6. Render markup from the table instance APIs
  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder ? null : (
                  <div
                    style={{
                      cursor: header.column.getCanSort()
                        ? 'pointer'
                        : undefined,
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <table.FlexRender header={header} />
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted()] ?? null}
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getAllCells().map((cell) => (
              <td key={cell.id}>
                <table.FlexRender cell={cell} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

