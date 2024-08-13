import { SummaryRow, SummaryHeader } from '../atoms'

export default function SummaryTable({ users, total, numMembers }) {
  return (
    <div>
      <SummaryHeader />
      <div className={`grid-rows-${users.length} grid gap-4 pb-8`}>
        {users.map((user) => (
          <SummaryRow user={user} total={total} numMembers={numMembers} />
        ))}
      </div>
    </div>
  )
}
