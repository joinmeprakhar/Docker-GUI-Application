import React from 'react';
import './css/Footer.css';

function Footer() {
	return (
		<div className="container-fluid nav_bg">
			<div className="row">
				<div className="col-12 mx-auto">

							<footer className="footer ">
								<div class="footer-content ">
									<h3 style={{color: 'white'}}>Welcome to Docker Application</h3>
									<p style={{color: 'white'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error blanditiis amet culpa nihil dolorum numquam, enim dolorem tenetur impedit minus et, ex nobis eius consequuntur soluta provident accusantium. Officia, facere! Laboriosam quod quisquam saepe repellat autem expedita eius praesentium ducimus nam quos odio, explicabo neque! Atque culpa ex maiores natus fuga id ad expedita commodi!</p>
									<ul class="socials ">
										<li><a target="_blank" href="https://www.linkedin.com/in/satyam-kumar-skic/"><i className="footer-icon-color fa fa-facebook"></i></a></li>
										<li><a target="_blank" href="https://github.com/kmsatyam"><i className="footer-icon-color fab fa-github"></i></a></li>
										<li><a target="_blank" href="https://www.linkedin.com/in/satyam-kumar-skic/"><i className="footer-icon-color fa fa-google-plus"></i></a></li>
										<li><a target="_blank" href="https://www.youtube.com/@letslearndevops2485"><i className="footer-icon-color fa fa-youtube"></i></a></li>
										<li><a target="_blank" href="https://www.linkedin.com/in/satyam-kumar-skic/"><i className="footer-icon-color fa fa-linkedin-square"></i></a></li>
									</ul>
								</div>
							</footer>
					
				</div>
			</div>
		</div>
	)
}

export default Footer
