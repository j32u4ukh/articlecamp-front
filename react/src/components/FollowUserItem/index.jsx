import Styles from './styles.module.css'

export default function FollowUserItem(props) {
    const { id, name, image, status } = props.user;

    return (
        <div className={Styles.container}>
            <div className={Styles.data}>
                {image ? (<img className={Styles.image} src={image} alt={`${name}_image`} />)
                    : (<img className={Styles.image} src='/images/icons8-not-found-100.png' alt='Image Not Found' />)}
                <div className={Styles.name}>{name}</div>
            </div>
            <button className={Styles.status} onClick={() => props.onFollowToggle(id)}>
                {props.isFollowed ? 'Unfollow' : 'Follow'}
            </button>
        </div>
    );
}