import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
// import { getEventsByUser } from "@/lib/actions/event.actions";
// import { getOrdersByUser } from "@/lib/actions/order.actions";
// import { IOrder } from "@/lib/database/models/order.model";
// import { SearchParamProps } from "@/types";
// import { auth } from "@clerk/nextjs";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  //   const { sessionClaims } = auth();
  //   const userId = sessionClaims?.userId as string;

  //   const ordersPage = Number(searchParams?.ordersPage) || 1;
  //   const eventsPage = Number(searchParams?.eventsPage) || 1;

  //   const orders = await getOrdersByUser({ userId, page: ordersPage });

  //   const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  //   const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link to="/">Explore More Events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={[]}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={2}
          urlParamName="ordersPage"
          totalPages={3}
        />
      </section>

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link to="/events/create">Create New Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={[]}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized"
          limit={3}
          page={4}
          urlParamName="eventsPage"
          totalPages={3}
        />
      </section>
    </>
  );
};

export default ProfilePage;
