

// export const ApoinmentSearchableFields = ['doctor', 'patient', '_id', 'service'  ];

export const ApoinmentSearchableFields = ['status', 'startTime', '_id', 'endTime', 'date', 'service', 'patient'  ];



// export const htmlContent = `
//   <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//       <h2 style="color: #2d3748;">Appointment Booked Successfully</h2>
//       <p>Dear ${user.name},</p>
//       <p>Your appointment has been booked with Dr. ${doctorInfo.user.name} for:</p>
//       <div style="background: #f7fafc; padding: 16px; border-radius: 8px; margin: 16px 0;">
//         <p><strong>Service:</strong> ${serviceInfo.title}</p>
//         <p><strong>Date:</strong> ${appointmentDate.toDateString()}</p>
//         <p><strong>Time:</strong> ${payload.startTime} - ${payload.endTime}</p>
//         <p><strong>Status:</strong> Pending (Waiting for doctor confirmation)</p>
//       </div>
//       <p>You will receive another email once the doctor confirms your appointment.</p>
//       <p>Thank you for using our service!</p>
//     </div>
// `;


export const textContent = "Thank you for book apoinment! We will keep you updated.";