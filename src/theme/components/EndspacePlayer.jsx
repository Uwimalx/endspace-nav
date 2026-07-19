import { IconMusic } from '@tabler/icons-react'

export const EndspacePlayer = ({ isExpanded = false, embedded = false }) => {
  return (
    <div
      className={`endspace-player flex items-center justify-center transition-all duration-300 ${
        isExpanded ? 'w-full' : 'w-10 h-10'
      }`}
    >
      <div className="flex items-center justify-center text-gray-500">
        <IconMusic size={isExpanded ? 20 : 18} stroke={1.5} />
      </div>
    </div>
  )
}

export default EndspacePlayer
