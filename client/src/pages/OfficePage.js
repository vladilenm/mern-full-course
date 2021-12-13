import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {OfficeCard} from '../components/OfficeCard'
import {PositionsPage} from './PositionsPage'

export const OfficePage = () => {
  const [links, setLinks] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/office', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) {
    return <Loader/>
  }
 

  return (
    <>
      {!loading && <OfficeCard links={links} />}
      <p></p>
      <p></p>
      <h5>Текущие позиции</h5>
      <PositionsPage />      
    </>    
  )
}
