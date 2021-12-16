jest.mock('./cockpit');

import React from 'react';
import { spawn } from "./cockpit";
import {render, screen, waitFor} from '@testing-library/react';
import Application from './app';


describe('<Application />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('fetching the status', () => {
    describe('a successful response', () => {
      beforeEach(() => {
        spawn.mockResolvedValue(JSON.stringify({
          details: {
            peers: [
              {
                name: 'name',
                Description: 'description',
                Tunnel: {
                  ProtocolEndpoint: 'unknown'
                },
                RoundTripTime: 'a year',
                VirtualAddress: 'unknown'
              },
              {
                name: 'name2',
                Description: 'descriptio2',
                Tunnel: {
                  ProtocolEndpoint: 'unknown2'
                },
                RoundTripTime: 'a year2',
                VirtualAddress: 'unknown2'
              }
            ]
          }
        }));
      });
      it('gets the status', () => {
        render(<Application/>);
        return waitFor(() => screen.getByText('description'), { timeout: 1000 });
      });
    });
    describe('an unsucessful response', () => {
      beforeEach(() => {
        spawn.mockRejectedValueOnce(new Error('an error'));
      });
      it('shows an error', () => {
        render(<Application/>);
        return waitFor(() => screen.getByText('error'), { timeout: 1000});
      });
    });

  });

});
