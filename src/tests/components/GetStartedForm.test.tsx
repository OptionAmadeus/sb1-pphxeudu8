import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GetStartedForm } from '../../components/marketing/GetStartedForm';

describe('GetStartedForm', () => {
  it('should show validation errors for empty fields', async () => {
    render(<GetStartedForm />);
    
    const submitButton = screen.getByText('Join Waitlist');
    fireEvent.click(submitButton);

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
  });

  it('should show success message after successful submission', async () => {
    render(<GetStartedForm />);
    
    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'Test User' }
    });
    
    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.click(screen.getByText('Join Waitlist'));

    await waitFor(() => {
      expect(screen.getByText("You're on the list!")).toBeInTheDocument();
    });
  });
});