import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CardCerita({
  id,
  thumbnail,
  judul,
  provinsi,
  onDelete

}) {
  return (
    <div className="card flex items-center gap-5">
      <div className="flex shrink-0 w-[140px] h-[110px] rounded-[20px] bg-[#D9D9D9] overflow-hidden">
        <img src={thumbnail} className="w-full h-full object-cover" alt="thumbnail" />
      </div>
      <div className="w-full">
        <h3 className="font-bold text-xl leading-[30px] line-clamp-1">{judul}</h3>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-[6px] mt-[6px]">
            <img src="/assets/images/icons/crown-purple.svg" className="w-5 h-5" alt="icon" />
            <p className="text-[#838C9D]">{provinsi}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-3">
        <Link to={`/dashboard/cerita/${id}/manage`} className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap">
          Manage
        </Link>
        <div className="flex justify-end items-center gap-3">
        <button type="button" onClick={() => onDelete?.(id)} className="w-fit rounded-full p-[14px_20px] bg-[#FF435A] font-semibold text-white text-nowrap">Delete</button>
      </div>
      </div>
    </div>
  )
}
CardCerita.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  judul: PropTypes.string.isRequired,
  provinsi: PropTypes.string.isRequired,
}
