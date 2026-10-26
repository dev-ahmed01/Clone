import test from 'node:test';
import assert from 'node:assert/strict';

import {
  filterRooms,
  formatMoney,
  readInquiryValues,
  rooms,
  totalRent,
  validateInquiry,
} from '../public/data.js';

test('totalRent multiplies weekly rent by tenancy duration', () => {
  assert.equal(totalRent(289, 51), 14739);
  assert.equal(formatMoney(totalRent(289, 51)), '£14,739');
});

test('filterRooms keeps all rooms or the requested category', () => {
  assert.equal(filterRooms(rooms, 'all').length, rooms.length);
  assert.deepEqual(filterRooms(rooms, 'studio').map((room) => room.category), ['studio']);
});

test('validateInquiry reports actionable errors and accepts a complete enquiry', () => {
  assert.deepEqual(validateInquiry({ name: '', email: 'not-an-email', phone: '', consent: false }), {
    name: 'Enter your name.',
    email: 'Enter an email address in the format name@example.com.',
    consent: 'Confirm that Accom may contact you about this enquiry.',
  });
  assert.deepEqual(validateInquiry({ name: 'Aisha Khan', email: 'aisha@example.com', phone: '', consent: true }), {});
});

test('readInquiryValues avoids HTMLFormElement.name shadowing', () => {
  const values = {
    name: { value: 'Aisha Khan' },
    email: { value: 'aisha@example.com' },
    phone: { value: '+44 7000 000000' },
    consent: { checked: true },
  };
  const form = {
    name: 'shadowing-form-name',
    elements: { namedItem: (key) => values[key] ?? null },
  };
  assert.deepEqual(readInquiryValues(form), {
    name: 'Aisha Khan', email: 'aisha@example.com', phone: '+44 7000 000000', consent: true,
  });
});
