// import { Flight } from '../models/index.js';

// async function rowLockQueryOnFlights(flightId) {
// 	try {
//     const flight = await Flight.findByPk(flightId, {
//       lock: true,       
//       transaction: transaction  
//     });

//     if (flight) {
//       console.log('Flight found and locked:', flight);
      
//     } else {
//       console.log('Flight not found.');
//     }
    
//     return flight;
    
//   } catch (error) {
//     console.error('Error locking flight:', error);
//     throw error;
//   }
// }

// module.exports = {
// 	rowLockQueryOnFlights,
// };
