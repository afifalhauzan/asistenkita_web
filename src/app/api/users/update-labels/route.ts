import { NextRequest, NextResponse } from 'next/server';

const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY!;

export async function POST(request: NextRequest) {
  try {
    const { userId, labels } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (!labels || !Array.isArray(labels)) {
      return NextResponse.json(
        { success: false, error: 'Labels must be an array' },
        { status: 400 }
      );
    }

    console.log('API: Updating user labels for userId:', userId);
    console.log('API: New labels:', labels);

    // Call Appwrite REST API to update labels
    const response = await fetch(
      `${APPWRITE_ENDPOINT}/users/${userId}/labels`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Appwrite-Project': APPWRITE_PROJECT_ID,
          'X-Appwrite-Key': APPWRITE_API_KEY,
        },
        body: JSON.stringify({ labels })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API: Appwrite error:', errorData);
      throw new Error(errorData.message || 'Failed to update labels in Appwrite');
    }

    const updatedUser = await response.json();

    console.log('API: User labels updated successfully:', updatedUser);
    console.log('API: Updated labels:', updatedUser.labels);

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: 'Labels updated successfully'
    });

  } catch (error: any) {
    console.error('API: Error updating labels:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to update labels' 
      },
      { status: 500 }
    );
  }
}

