import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({ post, handleTagClick }) => {
  return (
    <div className='prompt_card' >
        <div className="flex justify-between items-start gap-5 " >
            <div>
                <Image src={post?.creator.image} alt='user_img' width={40} height={40} className="rounded-full object-contain" />
            </div>
        </div>
    </div>
  )
}

export default PromptCard