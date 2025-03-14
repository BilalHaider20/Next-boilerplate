import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import { userSchema } from '@/models/Schema';

import { DeleteGuestbookEntry } from './DeleteGuestbookEntry';
import { EditableGuestbookEntry } from './EditableGuestbookEntry';

const GuestbookList = async () => {
  const guestbook = await db
    .select()
    .from(userSchema)
    .orderBy(userSchema.createdAt);

  logger.info('Get all users entries');

  return (
    <div className="mt-5" data-testid="guestbook-list">
      {guestbook.map((elt) => (
        <div key={elt.id} className="mb-1 flex items-center gap-x-1">
          <DeleteGuestbookEntry id={elt.id} />

          <EditableGuestbookEntry
            id={elt.id}
            username={elt.username}
            body={elt.body}
          />
        </div>
      ))}
    </div>
  );
};

export { GuestbookList };
