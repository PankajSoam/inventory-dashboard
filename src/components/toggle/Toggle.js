import React, { useState } from "react"

const Toggle = (props) => {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="flex justify-end p-2">
      <span className="ml-2 text-sm font-medium text-neutral-200">Admin</span>
      <label className="inline-flex relative items-center mx-2 cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={enabled}
          readOnly
        />
        <div
          onClick={() => {
            props.onToggle(!enabled)
            setEnabled(!enabled);
          }}
          className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
        ></div>
      </label>
      <span className=" text-sm font-medium text-neutral-200">User</span>
    </div>
  )
}

export default Toggle