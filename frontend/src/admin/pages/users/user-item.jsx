import React from 'react'
import Proptypes from 'prop-types'
import { Link } from 'react-router-dom'
export default function UserItem({ id, name, role, onDelete }) {
  return (
    <div className="card flex items-center gap-5">
      <div className="relative flex shrink-0 w-20 h-20">
        <div className="rounded-[20px] bg-[#D9D9D9] overflow-hidden">
          <img src="/assets/images/thumbnails/th-1.png" className="w-full h-full object-cover" alt="photo" />
        </div>
      </div>
      <div className="w-full">
        <h3 className="font-bold text-xl leading-[30px] line-clamp-1">{name}</h3>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-[6px] mt-[6px]">
            <img src="/assets/images/icons/note-favorite-purple.svg" className="w-5 h-5" alt="icon" />
            <p className="text-[#838C9D]">{role}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-3">
        <button type="button" onClick={()=> onDelete?.(id)} className="w-fit rounded-full p-[14px_20px] bg-[#FF435A] font-semibold text-white text-nowrap">Delete</button>
      </div>
    </div>
  )
}
UserItem.propTypes = {
  id: Proptypes.string.isRequired,
  name: Proptypes.string.isRequired,
  role: Proptypes.string.isRequired,
  onDelete: Proptypes.func
}