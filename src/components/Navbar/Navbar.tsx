import { useState, useEffect, useContext } from 'react'
import { NavLink, useHistory, useLocation } from "react-router-dom";
import queryString from 'query-string';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { MdSearch, MdNotificationsNone, MdAccountCircle } from 'react-icons/md';
import { QueryContext } from '../../context/QueryContext';
import './Navbar.scss';

export const Navbar = () => {
  const { query, setQuery } = useContext(QueryContext)
  const [logged, setLogged] = useState<boolean>(true)
  const [searchValue, setSearchValue] = useState<string | undefined | object>("")
  const [searchVisible, setSearchVisible] = useState<boolean>(false)
  const history = useHistory();
  const location = useLocation();

  const toggleLodded = () => {
    setLogged(!logged)
  }
  const toggleSearchVisible = () => {
    setSearchVisible(!searchVisible)
  }

  useEffect(() => {
    let search = queryString.parse(location.search)
    if (search && search['']) {
      setSearchValue(search[''])
      setSearchVisible(true)
    }
  }, [])

  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value)
  }
  const navToSearch = () => {
    setQuery(`${searchValue}`)
    history.push(`/search?=${searchValue}`)
  }
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      navToSearch()

    }
  }
  return (
    <div className='navbar'>
      <div className='navLogo'>
        <NavLink exact to={'/'}>
          <img src="data:image/png;base64,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" alt="OKO.Press logo" />
        </NavLink>
      </div>

      <ul className="navList">
        <li>
          <NavLink exact to={'/'}>
            Wydarzenia
          </NavLink>
        </li>
        <li>
          <NavLink exact to={'/test'}>
            Kontakt
          </NavLink>
        </li>
        <li>
          <NavLink exact to={'/test2'}>
            Wesprzyj Nas
          </NavLink>
        </li>
      </ul>
      <ul className="navUserPanel">
        <li>
          {searchVisible ?
            <>
              {searchVisible ? <>
                <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined' className='navBar-searchBar'  >
                  <InputLabel className={'navBar-searchBar-lbl'} htmlFor="outlined-adornment-search">Szukaj</InputLabel>
                  <OutlinedInput 
                    id="outlined-adornment-search"
                    type={'text'}
                    value={searchValue}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    autoFocus 
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={navToSearch}
                          edge="end"
                        >
                          <NavigateNextIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Szukaj"
                  />
                </FormControl></>
                : <></>}


              <MdSearch className='navIcon' onClick={toggleSearchVisible} /></> :
            <>

              <MdSearch className='navIcon' onClick={() => {
                toggleSearchVisible()
              }} />

            </>}
        </li>
        {logged ?
          <>
            <li>
              <MdNotificationsNone className='navIcon notificationIcon' />
            </li>
            <li>
              <MdAccountCircle className='navIcon circleIcon' onClick={toggleLodded} />
            </li>

          </> : <>
            <li className={'navUserPanel-lastItem'}>
              <button className='navBtn navLoginBtn' onClick={toggleLodded}>Zaloguj Się</button>
            </li>
          </>}
      </ul>
    </div >
  )
}


