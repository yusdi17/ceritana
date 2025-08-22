import React from 'react'
export default function CreateProvinsiPage() {
  return (
    <>
      <header className="flex items-center justify-between gap-[30px]">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px]">Provinsi Baru</h1>
          <p className="text-[#838C9D] mt-[1]">Selau ada cerita di setiap provoinsinya</p>
        </div>
        {/* <div className="flex items-center gap-3">
          <a href="#" className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap">
            Import from BWA
          </a>
        </div> */}
      </header>
      <form action="manage-course.html" className="flex flex-col w-[550px] rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]">
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="title" className="font-semibold">Nama Provinsi</label>
          <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
            <img src="/assets/images/icons/note-favorite-black.svg" className="w-6 h-6" alt="icon" />
            <input type="text" name="title" id="title" className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent" placeholder="Tuliskan judul cerita" required />
          </div>
        </div>
        <div className="relative flex flex-col gap-[10px]">
          <label for="thumbnail" className="font-semibold">Add a Thumbnail</label>
          <div id="thumbnail-preview-container" className="relative flex shrink-0 w-full h-[200px] rounded-[20px] border border-[#CFDBEF] overflow-hidden">
            <button type="button" id="trigger-input" className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-3 z-0" onclick="document.getElementById('thumbnail').click()">
              <img src="/assets/images/icons/gallery-add-black.svg" className="w-6 h-6" alt="icon" />
              <span className="text-[#838C9D]">Add an attachment</span>
            </button>
            <img id="thumbnail-preview" src="" className="w-full h-full object-cover hidden" alt="thumbnail" />
            <button type="button" id="delete-preview" className="absolute right-[10px] bottom-[10px] w-12 h-12 rounded-full z-10 hidden">
              <img src="/assets/images/icons/delete.svg" alt="delete" />
            </button>
          </div>
          <input type="file" name="thumbnail" id="thumbnail" accept="image/*" className="absolute bottom-0 left-1/4 -z-10" required />
        </div>
        <div className="flex items-center gap-[14px]">
          <button type="submit" className="w-full rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap">
            Save as Draft
          </button>
          <button type="submit" className="w-full rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap">
            Create Now
          </button>
        </div>
      </form>
    </>
  )
}
