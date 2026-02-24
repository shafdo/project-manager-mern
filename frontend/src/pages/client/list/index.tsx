'use client';

import React, { useState } from 'react';
import type { ClientType } from '@/types/client';
import { useQuery } from '@apollo/client/react';
import _ from 'lodash';
import { GET_CLIENTS } from '@/graphql/queries/client.queries';
import HeaderCompoennt from './header';
import SearchComponent from './search';
import TableComponent from './table';
import ErrorComponent from './error';
import DeleteDialogComponent from './delete-dialog';

const ClientListing: React.FC = () => {
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<ClientType | null>(null);

  // GQ query to fetch clients
  const { data, loading, error, refetch } = useQuery<{ clients: ClientType[] }>(
    GET_CLIENTS,
    {
      fetchPolicy: 'cache-and-network',
    }
  );
  // GQ query to fetch clients end

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

  const handleDelete = (client: ClientType) => {
    setDeleteTarget(client);
  };

  const confirmDelete = () => {
    // wire up your DELETE mutation here
    console.log('Deleting client:', deleteTarget);
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

        {/* ── Table ── */}
        <TableComponent
          search={search}
          filtered={filtered}
          loading={loading}
          handleDelete={handleDelete}
          clients={clients}
        />

        {/* ── Footer count ── */}
        {!loading && filtered.length > 0 && (
          <p className="text-xs text-muted-foreground text-right">
            Showing {filtered.length} of {clients.length} clients
          </p>
        )}
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
