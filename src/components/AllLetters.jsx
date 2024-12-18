import React from 'react';

function AllLetters({ open, children, onClose }) {
	const MODAL_STYLES = {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: '#FFF',
		padding: '2rem',
		zIndex: 1000
	};

const OVERLAY_STYLES = {
	position: 'fixed',
	top: 0, // Covers from the top of the viewport
	left: 0, // Covers from the left of the viewport
	right: 0, // Covers to the right of the viewport
	bottom: 0, // Covers to the bottom of the viewport
	backgroundColor: 'rgba(0,0,0,0.7)', // Semi-transparent black
	zIndex: 1000 // Stays on top of other elements
};


	if (!open) return null;

	return (
		<>
			<div style={OVERLAY_STYLES} aria-hidden="true"></div>
			<div style={MODAL_STYLES}>
				<button onMouseUp={onClose} aria-label="Close Modal">
					X
				</button>
				{children}
			</div>
		</>
	);
}

export default AllLetters;
