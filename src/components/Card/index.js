import { useState, useRef } from 'react';
import axios from 'axios';
import './style.css';

import Button from '../Button'
import Input from '../Input'

const Card = ({ data }) => {
	const formRef = useRef();

	const [displayForm, setDisplayForm] = useState("hidden");
	const [displayBtn, setDisplayBtn] = useState("");

	const deleteMember = (event) => {
		axios.delete(`http://localhost:3003/member/${event.target.value}`)
			.then(res => {
				console.log(res.data);
			})
			.catch(err => console.log("erreur:", err.message))
	}

	const updateMember = (event) => {
		event.preventDefault();
		axios.patch(`http://localhost:3003/member/${formRef.current.value}`,
			{
				name: event.target.name.value,
				email: event.target.email.value,
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
			.then(res => {
				console.log(res.data);
				setDisplayForm("hidden")
			})
			.catch(err => console.log("erreur:", err.message))
	}

	return (
		<article className="card" >
			<p> {data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>
			<p> {data.email}</p>
			<div className="btns-container">
				<Button className={`button ${displayBtn}`} type="button" onClickBtn={deleteMember} value={data.id} content="Supprimer" />
				<Button
					className={`button ${displayBtn}`}
					type="button"
					onClickBtn={() => {
						setDisplayForm("");
						setDisplayBtn("hidden");
					}}
					value={data.id}
					content="Modifier" />
			</div>
			<form className={displayForm} onSubmit={updateMember}>
				<div className="btns-container">
					<Button className="button" reference={formRef} value={data.id} type="submit" content="Valider" onClickBtn={() => setDisplayBtn("")} />
					<Button
						className="button"
						type="button"
						content="Retour"
						onClickBtn={() => {
							setDisplayForm("hidden");
							setDisplayBtn("");
						}} />
				</div>
				<Input className="input" name="name" type="text" placeholder="Nom" />
				<Input className="input" name="email" type="email" placeholder="Email" />

			</form>
		</article>
	)
}


export default Card;