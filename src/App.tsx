import { useState } from 'react';
import {
  CircularProgress,
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Stack,
  Button
} from '@mui/material';
import { useQuery } from 'react-query';
import { useDebounce } from 'use-debounce';

function App() {
  const [queryInput, setQueryInput] = useState('');

  const [queryDebounced, queryDbc] = useDebounce(queryInput, 500);

  const ytdlQuery = useQuery(`ytdl-${queryDebounced}`, () =>
    !queryDebounced
      ? null
      : fetch(`https://ytdl.dmisdm.dynv6.net/?url=${queryDebounced}`).then(
          (r) => r.json()
        )
  );
  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h1">Audio Downloader</Typography>
        <TextField fullWidth label="Query" />
        {ytdlQuery.isLoading && <CircularProgress />}
        {ytdlQuery.data && <pre>{JSON.stringify(ytdlQuery.data, null, 2)}</pre>}
      </Stack>
    </Container>
  );
}

export default App;
