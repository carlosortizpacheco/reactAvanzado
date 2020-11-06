import React, { Fragment, useEffect, useState } from 'react'
import { Category } from '../Category/index'
import { categories } from '../../../api/db.json'

import { List, Item } from './styles'

function useCategoriesData() {
	const [ categoriez, setCategories ] = useState(categories)
	const [ loading, setLoading ] = useState(false)
	
	useEffect( () => {
		setLoading(true)
		if(categories.length>0) {
			setLoading(false)
		}

		window.fetch('')
			.then( res => res.json())
			.then( res => {
				setCategories(res)
				setLoading(false)
			})
	}, [])

	return { categoriez, loading }
}

export const ListOfCategories = () => {
	const { categoriez, loading } = useCategoriesData()

	const [ showFixed, setShowFixed ] = useState(false)



	useEffect(()=>{
		const onScroll = e => {
			const newShowFixed = window.scrollY > 200
			showFixed !== newShowFixed && setShowFixed(newShowFixed)
		}

		document.addEventListener('scroll', onScroll)

		return () => {
			document.removeEventListener('scroll',onScroll)
		}
	},[showFixed])

	const renderList = (fixed) => (
		<List fixed={fixed}>
			{
				loading 
				? <Item key='loading'><Category /></Item> 
				: categoriez.map( category => <Item key={category.id}><Category {...category}/></Item> )
			}
		</List>
	)

	if(loading) {
		return 'cargando...'
	}

	return (
		<Fragment>
			{renderList()}
			{ showFixed && renderList(true)}
		</Fragment>
	)
}

