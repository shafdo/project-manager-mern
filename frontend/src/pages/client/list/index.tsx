'use client';

import React, { useState } from 'react';
import type { ClientType } from '@/types/client';
import { useMutation, useQuery } from '@apollo/client/react';
import _ from 'lodash';
import { GET_CLIENTS } from '@/graphql/queries/client.queries';
import HeaderCompoennt from './header';
import SearchComponent from './search';
import TableComponent from './table';
import ErrorComponent from '../../../components/ui/error';
import DeleteDialogComponent from './delete-dialog';
import { DELETE_CLIENT } from '@/graphql/mutations/client.mutations';

const ClientListing: React.FC = () => {
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<ClientType | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // GQ query to fetch clients
  const { data, loading, error, refetch } = useQuery<{ clients: ClientType[] }>(
    GET_CLIENTS,
    {
      fetchPolicy: 'cache-and-network',
    }
  );
  // GQ query to fetch clients end

  // GQ mutations
  const [deleteClient] = useMutation<{ deleteClient: { id: string } }>(
    DELETE_CLIENT,
    {
      update(cache, { data }) {
        // Refresh the cache to remove the deleted client
        if (!data) return;

        const existingClientsCache = cache.readQuery<{ clients: ClientType[] }>(
          {
            query: GET_CLIENTS,
          }
        );
        const newClients =
          _.reject(existingClientsCache?.clients, {
            id: data.deleteClient.id,
          }) ?? [];

        cache.writeQuery({ query: GET_CLIENTS, data: { clients: newClients } });
      },
      onCompleted: () => {
        setDeleteTarget(null);
        setDeleteError(null);
      },
      onError: (err: Error) => {
        console.error('Error deleting client:', err);
        setDeleteTarget(null);
        setDeleteError(err.message);
      },
    }
  );
  // GQ mutations end

  const clients: ClientType[] = data?.clients || [];

  // Filter clients based on search query
  const filtered = _.filter(clients, (client) => {
    const keyword = search.toLowerCase();
    return _.some(
      [client.name, client.email, client.phone, client.id],
      (field) => field.toLowerCase().includes(keyword)
    );
  });
  // Filter clients based on search query end

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteClient({ variables: { id: deleteTarget.id } });
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-screen bg-muted/30 p-6 pt-12">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ── Header ── */}
        <HeaderCompoennt loading={loading} clients={clients} />

        {/* ── Search + Refresh ── */}
        <SearchComponent
          keyword={search}
          setSearch={setSearch}
          loading={loading}
          refetch={refetch}
        />

        {/* ── Error state ── */}
        {error && <ErrorComponent message={error.message} />}
        {deleteError && <ErrorComponent message={deleteError} />}

        {/* ── Table ── */}
        <TableComponent
          search={search}
          filtered={filtered}
          loading={loading}
          setDeleteTarget={setDeleteTarget}
          clients={clients}
        />
      </div>

      {/* ── Delete Confirmation Dialog ── */}
      <DeleteDialogComponent
        deleteTarget={deleteTarget}
        setDeleteTarget={setDeleteTarget}
        confirmDelete={confirmDelete}
      />
    </div>
  );
};

export default ClientListing;
