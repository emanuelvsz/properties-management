from django.test import TestCase
from property.models import Property
from property.service import PropertyService
from django.contrib.auth import get_user_model


class PropertyServiceTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username="testuser", password="testpassword"
        )
        self.property = Property.objects.create(
            title="Test Property",
            bedrooms=3,
            bathrooms=2,
            surface=120,
            rent_value=1500,
            furnished=True,
            description="Test description",
            user=self.user,
        )

    def test_get_property_by_id(self):
        property = PropertyService.get_property_by_id(self.property.id)
        self.assertEqual(property.title, "Test Property")

    def test_update_property(self):
        updated_data = {
            "title": "Updated Property Title",
            "bedrooms": 4,
            "bathrooms": 3,
            "surface": 130.0,
            "rent_value": 1600.0,
            "furnished": False,
            "description": "Updated description",
        }

        updated_property = PropertyService.update_property(
            self.property.id, updated_data
        )
        self.assertEqual(updated_property.title, "Updated Property Title")
        self.assertEqual(updated_property.bedrooms, 4)
        self.assertEqual(updated_property.rent_value, 1600.0)

    def test_delete_property(self):
        is_deleted = PropertyService.delete_property(self.property.id)
        self.assertTrue(is_deleted)
        with self.assertRaises(Property.DoesNotExist):
            Property.objects.get(id=self.property.id)

    def test_property_not_found(self):
        try:
            _ = PropertyService.get_property_by_id(9999)
        except Property.DoesNotExist:
            self.assertTrue(True)
        else:
            self.fail("Property matching query does not exist.")

    def test_update_property_not_found(self):
        updated_data = {
            "title": "Nonexistent Property",
            "bedrooms": 5,
        }
        property = PropertyService.update_property(9999, updated_data)
        self.assertIsNone(property)
