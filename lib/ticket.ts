interface TicketFormData {
  email: string;
  title: string;
  description: string;
}

interface TicketResponse {
  statusCode: number;
  data: {
    id: string;
    userId: string;
    title: string;
    description: string;
    status: string;
    createdDate: string;
    modifiedDate: string;
  };
}

export async function submitTicket(formData: TicketFormData): Promise<TicketResponse> {
  const response = await fetch('https://api.zhienw.com/customer-service-tickets/customer/tricket', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Failed to submit ticket');
  }

  return response.json();
}

