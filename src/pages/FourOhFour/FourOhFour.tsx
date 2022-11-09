import { Helmet } from 'react-helmet';
import { Rhythm } from '@phork/phorkit';
import { CLUB_NAME } from 'config/club';
import { MissingContentAlert } from 'components/MissingContentAlert';
import { PagePaper } from 'components/PagePaper';

export const FourOhFour = (): React.ReactElement => {
  return (
    <PagePaper centered flexible>
      <Helmet>
        <title>{`${CLUB_NAME} - 404`}</title>
      </Helmet>

      <Rhythm grouped my={6}>
        <MissingContentAlert color="primary" href="/" message="Page not found" />
      </Rhythm>
    </PagePaper>
  );
};
