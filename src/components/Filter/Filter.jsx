
import PropTypes from 'prop-types'
import css from './Filter.module.css'


export function Filter({ filter, onChange }) {
    
    


        return (
            <label>
          Find contact
          <input type='text' className={css.FilterInput} name='filter' value={filter} onChange={onChange} />
        </label>
        )
    }



    
Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired
}