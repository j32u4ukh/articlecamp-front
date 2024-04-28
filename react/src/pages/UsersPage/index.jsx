import BasicLayout from '../../layouts/BasicLayout';
import PageStyles from '../page.module.css';
import Styles from './style.module.css';

export default function UsersPage(){
    return (
        <BasicLayout>
            <div className={`${Styles['search-container']} ${PageStyles['d-flex']} ${PageStyles['c-flex-axis0-center']}`}>
                <div id="search-form" className={`${Styles['search-bar']} ${PageStyles['horizon-center-layout']}`}>
                    <input id={Styles['search-input']} type="text" placeholder="Search..." name="search" value="" />
                    <button id={`${Styles['search-btn']}`} className={`${'btn'} ${'c-border'}`}>Search</button>
                </div>
            </div>

            <div className={`${'flex-column'} ${'text-center'} ${PageStyles['d-flex']}`}>
            </div>
        </BasicLayout>
    );
}