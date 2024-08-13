import { calculateShare } from '../../../utils'

export default function SummaryRow({ user, total, numMembers }) {
  return (
    <div
      className="grid grid-cols-3 justify-center gap-4 text-center text-black"
      key={user.id}
    >
      {user.owner ? (
        <div>{`${user.userName} (owner)`}</div>
      ) : (
        <div>{user.userName}</div>
      )}
      <div>{calculateShare(total, numMembers)}</div>
      {user.accepted ? (
        <div className="rounded-md bg-yellow">Yes</div>
      ) : (
        <div className="rounded-md bg-orange">No</div>
      )}
    </div>
  )
}
