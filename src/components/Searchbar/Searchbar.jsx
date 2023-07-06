import {useState} from 'react'
import PropTypes from 'prop-types'
import css from './Searchbar.module.css'


const Searchbar = ({onSubmit}) => {
  const [inputValue, setInputValue] = useState("");

  const inputHandler = e => {
    setInputValue(e.target.value)
  };

  const submitHander = e => {
    e.preventDefault();
    onSubmit(e);
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={submitHander}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          value={inputValue}
          onInput={inputHandler}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default Searchbar


