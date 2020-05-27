import React from 'react';
import './App.css';
import Customer from './components/customer/customer';
import ButtonAppBar from './components/navbar/navbar';
import Container from '@material-ui/core/Container';
function App()
{
	return (
		<div className="App">
			<ButtonAppBar />
			<Container>
				<Customer />
			</Container>
		</div>
	);
}
export default App;
