import React, {Fragment, useEffect, useRef, useState} from 'react'
import { ImgWrapper, Img, Button, Article } from './styles'
import { MdFavoriteBorder, MdFavorite }  from  'react-icons/md'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useNearScreen } from '../hooks/useNearScreen'


const DEFALT_IMAGE = "https://res.cloudinary.com/midudev/image/upload/w_150/v1555671700/category_dogs.jpg"



export const PhotoCard= ({ id, likes=0, src = DEFALT_IMAGE }) => {
	const key = `liked-${id}`
	const [ liked, setLiked ] = useLocalStorage(key,false)
	const [ show, ref ] = useNearScreen()



	const Icon = liked ? MdFavorite : MdFavoriteBorder

	return (	
		<Article ref={ref}>
			{ show &&
			<Fragment>
				<a href={`/detail/${id}`}>
					<ImgWrapper>
						<Img src={src}/>
					</ImgWrapper>
				</a>
				<Button onClick={ () => setLiked(!liked) }>
					<Icon size='32px'/> {likes} likes!
				</Button>
			</Fragment>
			}
		</Article>
	)
}