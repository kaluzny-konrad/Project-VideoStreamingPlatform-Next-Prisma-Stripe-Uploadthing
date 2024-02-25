import { db } from "@/db";
import PaymentButton from "@/components/PaymentButton";
import { formatPrice } from "@/lib/utils";

type Props = {};

export default async function page({}: Props) {
  const courses = await db.course.findMany({
    include: {
      OrdersWithCourse: true,
    },
  });
  const courseIds = courses.map((course) => course.id);

  return (
    <div>
      <h1>Stripe Payment Test</h1>
      <ul>
        {courses.map((course) => (
          <li className="mt-8" key={course.id}>
            <p>Id: {course.id}</p>
            <p>Name: {course.name}</p>
            <p>Price: {formatPrice(course.price)}</p>
            <p>Image: {course.imageId}</p>
            <p>priceId: {course.priceId}</p>
            <p>stripeProductId: {course.stripeProductId}</p>
            {course.OrdersWithCourse && (
              <>
                <p>
                  OrdersWithCourse:{" "}
                  {course.OrdersWithCourse.map((order) => (
                    <p key={order.id}>{order.id}</p>
                  ))}
                </p>
              </>
            )}
          </li>
        ))}
      </ul>
      {courseIds.length > 0 ? (
        <div className="mt-8">
          <PaymentButton courseIds={courseIds} />
        </div>
      ) : (
        <p>No courses</p>
      )}
    </div>
  );
}
